import sqlite3
try:
    conexion = sqlite3.connect("./Backend/database.db")
    cursor = conexion.cursor()
    cursor.execute("CREATE TABLE persona (nombre VARCHAR(25), edad INTEGER)")
    
except Exception as ex:
    print(ex)