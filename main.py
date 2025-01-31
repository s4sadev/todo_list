from flask import Flask, render_template, request
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

@app.route('/listar')
def get_task():
    conn = db_conect()
    #cursor conecta
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    # execute busca
    cursor.execute('SELECT * FROM tasks_table;')
    # pega o resultado e guarda em uma variavel
    tasks = cursor.fetchall() # retorna um dicionario
    #gardar as tarefas que estao com check box em um objeto
    tasks_checked = []
    for task in tasks:
        if task["status"] == "concluido":
            task["checkbox"] = True
        else:
            task["checkbox"] = False
        if task["checkbox"]:
            tasks_checked.append(tasks)

    print(tasks_checked)
    # fecha o cursor
    cursor.close()
    # fecha a conexao se nao tiver fehado
    if cursor and not conn.close:
        conn.close()
    
    return render_template('index.html', tasks=tasks)


#criar
@app.route('/add', methods=["GET", "POST"])
def home():
    conn = db_conect()
    cursor = conn.cursor()
    if request.method == 'POST':
        name_form = request.form['nome_form']
        cursor.execute('INSERT INTO tasks_table (nome) VALUES (%s)', (name_form,))
        conn.commit()
        cursor.close()
    if cursor and not conn.close:
        conn.close()
        return "POST recebido!"
    return render_template('index.html')


@app.route('/up/<int:id>', methods=['POST','GET'])
def atualizes(id):
    if request.method == 'POST':
        return f'<p>{id}</p>'
    return render_template('index.html')


# #atualizar
# @app.route('/update/<int:id>/complete', methods=['GET','POST'])
# def up_task():
#     conn = db_conect()
#     if request.method == 'POST':
#         box = request.form
#         if 'box' in request.form:
#             box_status = box['box'] #recebe on pode ser tambem request.form['box'] que recebe o valor da chave 'box'
#             #se a caixinha esta marcada iremos atualizar o valor da check para CONCLUIDO!
#             cursor = conn.cursor()
#             cursor.execute("UPDATE tasks_table SET status = 'concluido' WHERE status = 'pendente'")
#             conn.commit()
#             cursor.close()
#             if conn and not conn.close: #duvidas(sintaxe and not e porque nao tem () em close
#                 conn.close()
#         else:
#             box_status = 'off' #recebe off
            
#     return render_template('index.html')


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)
