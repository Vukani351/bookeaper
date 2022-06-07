# tkinter module for the window.
from tkinter import *
import sys as sys
import tkinter


class BK_window:
    def __init__(self, master):
        # window needs to know the master
        self.master = master
        frame = Frame(master)
        self.master.title("Book Keeper Program")
        # Create a Label to display a header 10
        self.headLbl = Label(frame, text="Choose your work", relief=RIDGE)
        self.headLbl.pack(side=TOP, fill=X)

         # Create a border using a dummy frame with a large border width
        spacerFrame = Frame(frame, borderwidth=60)
        # Create another frame to hold the center part of the form
        centerFrame = Frame(spacerFrame)
        leftColumn = Frame(centerFrame, relief=GROOVE, borderwidth=2)
        rightColumn = Frame(centerFrame, relief=GROOVE, borderwidth=2)

        # Create some colorful widgets
        # self.colorLabel = Label(rightColumn, text="Select a color")
        # self.colorLabel.pack(expand=YES, fill=X)
        
         # Create some Radiobuttons
        self.radioBtns = [ ]
        self.radioVal = StringVar(master)
        btnList = ("ADD Book", "Add Chapter", "Close Book")
        # for option in btnList:
        self.radioBtns.append(Radiobutton(leftColumn, text=btnList[1], value='option', indicatoron=TRUE,variable=self.radioVal, command=self.popup))
        self.radioBtns.append(Radiobutton(leftColumn, text=btnList[0], value='option1', indicatoron=TRUE,variable=self.radioVal, command=self.showInfo))

        if (len(btnList) > 0):
            self.radioVal.set(btnList[0])
            # self.updateColor()
            for btn in self.radioBtns:
                btn.pack(anchor=W)

        entryText = StringVar(master)
        entryText.set("Select a color")
        self.colorEntry = Entry(rightColumn, textvariable=entryText)
        centerFrame.pack(side=TOP, expand=YES, fill=BOTH)

        leftColumn.pack(side=LEFT, expand=YES, fill=Y)
        rightColumn.pack(side=LEFT, expand=YES, fill=BOTH)
        centerFrame.pack(side=TOP, expand=YES, fill=BOTH)
        
        spacerFrame.pack(side=TOP, expand=YES, fill=BOTH)
        frame.pack(expand=YES, fill=BOTH)

    def quit():
        sys.exit()
    
    def showInfo(self):
        toplevel = Toplevel(self.master, bg="gray")
        toplevel.transient(self.master)
        toplevel.title("Adding A book")
        Label(toplevel, text="Type in the book name: ", fg="navy", bg="white").pack(pady=30)
        # Label(toplevel, text="", bg="white").pack()


        Button(toplevel, text="Close", command=toplevel.withdraw).pack(pady=30)
        
    def popup(self):
        toplevel = Toplevel(self.master, bg="gray")
        toplevel.transient(self.master)
        toplevel.title("Adding A book")
        Label(toplevel, text="A simple Tkinter demo", fg="navy", bg="white").pack(pady=20)
        Label(toplevel, text="http://www.cs.mcgill.ca/˜bdufou1/", bg="white").pack()
        Button(toplevel, text="Close", command=toplevel.withdraw).pack(pady=30)
    



root = Tk()
w = BK_window(root)
root.mainloop()