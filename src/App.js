import { useState } from "react";
import { fetchBook } from "./components/fetchData";
import './App.css';
import { Button, Flex, Result, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";


function App() {
  const [apiStatus, setApiStatus] = useState("init");
  const [searchText, setSearchText] = useState("9780413745200");
  const [bookDetails, setBookDetails] = useState(null);

  const searchingBook = async () => {
    const isbn = searchText;
    setApiStatus("pending");
    const { status, data } = await fetchBook(isbn);

    if (status) {
      setApiStatus("success");
      setBookDetails(data);
    } else {
      setApiStatus("error");
    }
  };

  let { items } = bookDetails ?? {};
  
  return (
    <div className="container">
      <div className="inputContainer">
        <input
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          disabled={apiStatus === "error"}
          type="text"
          name="searchBox"
          id="searchBox"
          placeholder="Enter ISBN10 or ISBN13"
        />
        <button
          id="searchBtn"
          disabled={apiStatus === "error"}
          onClick={searchingBook}
          type="button"
        >
          Search Now
        </button>
      </div>
      {apiStatus === "pending" && (
        <Flex align="center" gap="middle">
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 78,
                }}
                spin
              />
            }
          />
        </Flex>
      )}
      {apiStatus === "success" &&
        items
          ?.filter((item) => item.volumeInfo.imageLinks)
          ?.map((book, j) => {
            const {
              volumeInfo: {
                title,
                language,
                authors,
                industryIdentifiers,
                imageLinks: { thumbnail },
                publishedDate,
                description,
              },
            } = book;

            console.log(authors);

            return (
              <div className="bookInfo" key={title}>
                <div className="imageCont">
                  <img src={thumbnail} alt="" />
                </div>
                <div className="bookDetailsCont">
                  <h1>{title}</h1>
                  <h4>Authors of a Book:</h4>
                  <div className="authorsName">
                    {authors?.map((authorName, i) => {
                      return (
                        <p key={authorName + title + i + j}>{authorName}</p>
                      );
                    })}
                  </div>
                  <ul className="isbnDetails">
                    <h4>Industry Indentifiers:</h4>
                    {industryIdentifiers?.map((isbns, i) => {
                      const { type, identifier } = isbns;
                      return (
                        <li>
                          <p>
                            {type} : {identifier}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                  <p>
                    <strong>Language : </strong>
                    {language}
                  </p>
                  <p>
                    <strong>Published Year : </strong>
                    {publishedDate}
                  </p>
                  <h4>Description</h4>
                  <p className="bookDescription">{description}</p>
                </div>
              </div>
            );
          })}
      {apiStatus === "error" && (
        <Result
          status="warning"
          title="There are some problems with your operation."
          extra={
            <Button onClick={searchingBook} type="primary" key="console">
              Retry
            </Button>
          }
        />
      )}
    </div>
  );
}

export default App;