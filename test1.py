from tkinter import *
from tkinter import ttk as tkk

root = Tk()
frm = tkk.Frame(root, padding=10)
frm.grid()
tkk.Label(frm, text = "Hello World!!").grid(column=1, row=0)
tkk.Button(frm, text="Quit", command=root.destroy).grid(column=1, row=0)
root.mainloop()
