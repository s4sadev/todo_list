from flask import Flask, render_template, request, jsonify
import psycopg2
from psycopg2.extras import RealDictCursor #antes de tudo importar


#app = Flask(__name__)

#supabase é so com psycopg2, e é preciso usar essa conexao Transaction pooler pois ela é compativel com o TCP/IP
# Para iniciar a conexao atribuimos o valor encontrado dentro da biblioteca mysql a uma variavel

def db_conect():
    return psycopg2.connect( # entrando dentro da biblioteca mysql e criando uma conexao
        host="aws-0-sa-east-1.pooler.supabase.com", #1
        database="postgres", #2
        password = "sex24012025.1416", #3
        user = "postgres.uibceqinztofwzhkusdn",  #4
        port = "6543"  #5

    )

app = Flask(__name__)


#listar
@app.route('/listar')
def get_task():
    conn = db_conect()
    #cursor conecta
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    # execute busca
    cursor.execute('SELECT * FROM tasks_table ORDER by id ASC;')
    # pega o resultado e guarda em uma variavel
    tasks = cursor.fetchall() # retorna um dicionario
    #gardar as tarefas que estao com check box em um objeto
    # fecha o cursor
    cursor.close()
    # fecha a conexao se nao tiver fehado
    if cursor and not conn.close:
        conn.close()
    print(tasks)

    return render_template('index.html', tasks=tasks)

#criar
@app.route('/add', methods=["GET", "POST"])
def add_task():

    if request.method == 'POST':
        conn = db_conect()
        cursor = conn.cursor()
        
        data = request.get_json()
        name_json = data.get('name')
        
        
        cursor.execute('INSERT INTO tasks_table (nome) VALUES (%s)', (name_json,))
        conn.commit()
        cursor.execute('SELECT id, status FROM tasks_table ORDER BY id DESC LIMIT 1')
        infos = cursor.fetchall() #salvar é com o cursor e salvar alterações é com o conn 
        cursor.close()
        id_task = infos[0][0]
        status_task = infos[0][1]
        if cursor and not conn.close:
            conn.close()
        
        return jsonify({
            "id_new": id_task,
            "name_new": name_json,
            "status_new": status_task
        })
    return render_template('index.html')

#atualizar
@app.route('/up/<int:id>', methods=['PATCH','GET'])
def update_task(id):
    conn = db_conect()

    if request.method == 'PATCH':
        #conectando
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # pegando o json
        data_check = request.get_json() # dados do json
        print(data_check)
        check_status = data_check.get("checkedIn") # true or false
        print(check_status)

        #na verdade so entrar e modificar
        if check_status == True:
            status = 'concluido'
        else:
            status = 'pendente'
        print(status)
        cursor.execute("UPDATE tasks_table SET status = (%s) WHERE id = (%s)", (status, id))

        conn.commit()
        cursor.close()


        if cursor and not conn.close:
            conn.close()
        return jsonify({
            "idCheck": id,
            "result": check_status
        })
    #muito importante enviar o json

    return render_template('index.html')

#remover
@app.route('/del/<int:id>', methods=['DELETE', 'GET'])
def remove_task(id):
    conn = db_conect()
    if request.method == 'DELETE':
        #conectando
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        #deleteando
        cursor.execute(('DELETE FROM tasks_table WHERE id = %s') , (id, ))
        #salvando
        conn.commit()
        #fechando
        cursor.close()
        if cursor and not conn.close:
            conn.close()

        return jsonify({
            "idDel": id
        })
    else:
        return render_template('index.html')


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)
