import os

# content of the book class
def getInput():
    try:
        inputType = input('Hey, What do you wana do? \n\nAdding a book: B\nAdding Chapter: C \nClosing a Book: X\n')
        if (inputType):
            if(inputType.lower() == 'b'):
                book = input('give me the name of the book:\t\t')
                addBook(book)
            elif(inputType.lower() == 'c'):
                # take the book name. 
                bookname = input('\nPlease give me the name of the book for this chapter \n')
                # Take the input of the chapter to add next
                chapterName = input('\nPlease give me the chaper name and number\n')
                chapter_input = input('\nPlease input the chapter data:\n')
                addChapter(bookname, chapterName, chapter_input)
            
        else:
            print('you entered nothing')
    except:
        return 'error with input'

# function to add book:
def addBook(book):
    books = open(book + '.txt','a')
    books.write("\n\t\t------------------------------------------------------------------------------") 
    books.write(book) 
    print(book + '\t is created: ')
    
    
def addChapter(bookname, chapterName, chapter_input):
    book_file = open(bookname + ".txt", "a")  
    book_file.write("\n\t\t------------------------------------------------------------------------------") 
    book_file.write('\n' + chapterName + '\n')
    book_file.write('\n' + chapter_input + '\n')
    book_file.close()

def getBook(name):
    return os.path.exists(name + '.txt')


getInput()
