import Button from "@mui/material/Button";
import tw from "tailwind-styled-components";
import useBookStore from '../stores/useBookStore';
import { useEffect } from "react";
import { Link, params } from "react-router-dom";

const ArticlesContainer = tw.div`container px-5 my-10 mx-auto animate__animated animate__bounceInUp`;
const IntroContainer = tw.div`flex flex-wrap w-full mb-20`;
const ArticlesBody = tw.div`flex flex-wrap -m-4`;

function Books() {
  const { fetchBooks, books } = useBookStore();

  useEffect(() => {
    fetchBooks();
    console.log("Fetching books...", books);
  }, [fetchBooks]);

  return (
    <div className="text-gray-600 body-font">
      <ArticlesContainer>
        <IntroContainer>
          <div className="lg:w-11/12 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              My Library
            </h1>
            <p className="w-full leading-relaxed text-gray-500">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't 
              heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag.
            </p>
          </div>
        </IntroContainer>

        <ArticlesBody>
          {books ? (
            books.map((book) => (
              <Link to={"/book/" + book.id} key={book.id} params={{userId: 10}} className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <img className="h-40 rounded w-full object-cover object-center mb-6"
                    src="https://dummyimage.com/720x400"
                    alt="content"
                  />
                  <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                    {book.author}
                  </h3>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                    {book.title}
                  </h2>
                  <p className="leading-relaxed text-base">
                    {book.created_at}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p>No books available.</p>
          )}
        </ArticlesBody>
      </ArticlesContainer>
    </div>
  );
}

export default Books;
