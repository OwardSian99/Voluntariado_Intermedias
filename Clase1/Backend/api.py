from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def connect_db():
    try:
        conexion = sqlite3.connect("./Backend/database.db")
        return conexion
    except Exception as ex:
        print(ex)

@app.route('/', methods = ['GET'])
def inicio():
    return "Servidor activo"


@app.route('/agregarPersona', methods = ['POST'])
def agregarPersona():
    try:
        data = request.get_json()
        if 'nombre' in data and 'edad' in data:
            #Almacenando una persona en mi base de datos
            conexion = connect_db()
            cursor = conexion.cursor()
            cursor.execute('INSERT INTO persona (nombre, edad) VALUES (?,?)', (data['nombre'], data['edad']))
            conexion.commit()
            
            #Retornando los valores de mi base de datos
            cursor.execute("SELECT * FROM persona")
            resultado = cursor.fetchall()
            nombres = [row[0] for row in resultado]
            edades = [row[1] for row in resultado]
            conexion.close()
            
            data = {
                "mensaje":"Persona Agregada Correctamente",
                "nombres" : nombres,
                "edades":edades
            }
            
            return jsonify(data)
        else:
            data = {
                "mensaje":"Persona no se pudo agregar",
                "nombres" : [],
                "edades":[]
            }
            return jsonify(data)
            
    except Exception as ex:
        print(ex)
        data = {
                "mensaje":"Ocurrió un error en la base de datos",
                "nombres" : [],
                "edades":[]
            }
        return jsonify(data)
        

if __name__ == '__main__':
    app.run(debug=True)