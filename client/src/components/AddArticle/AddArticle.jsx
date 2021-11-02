import React, {useCallback, useState, useContext} from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import axios from "axios";
import Loader from "react-loader-spinner";

import AuthContext from "../../context/AuthContext";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./AddArticle.scss";

const AddArticle = () => {
  const {token} = useContext(AuthContext);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onEditorStateChange = (editorState) => setEditorState(editorState);
  const onTitleChange = (e) => setTitle(e.target.value);
  const onCategoryChange = (e) => setCategory(e.target.value);
  const onImageChange = (e) => setImage(e.target.files[0]);

  const rawContentState = convertToRaw(editorState.getCurrentContent());
  const markup = draftToHtml(rawContentState);

  const onPublishArticle = async () => {
    setLoading(true)

    const data = new FormData();

    data.append("image", img);
    data.append("title", title);
    data.append("category", category);
    data.append("description", markup);

    await axios.post("/api/article", data, {
      headers: {
        "Content-Type": "multipart/form-data; boundary=\"another cool boundary\"",
        "Authorization": `${token}`
      }
    })
      .then(res => {
        console.log(res.data);
        // console.log(res.data.message);
        window.scroll(0,0);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data.message);
        } else if (error.request) {
          console.log("Request", error.request);
        } else {
          console.log("Error", error.message);
        }
      });

    setEditorState(EditorState.createEmpty());
    setTitle("");
    setCategory("");
    setImage(null);
  };

  return (
    <div className="add-article">
      {
        loading
          ? (
            <Loader
              className="loader"
              type="TailSpin"
              color="#282828"
              height={250}
              width={250}
            />
          ) : (
            <div className="container">
              <div className="add-article__wrapper">
                <h1 className="add-article__title">Add article</h1>
                <div className="add-article__text-editor">
                  <Editor
                    editorState={editorState}
                    placeholder="Enter a post..."
                    toolbarClassName="add-article__toolbarClassName"
                    wrapperClassName="add-article__wrapperClassName"
                    editorClassName="add-article__editorClassName"
                    onEditorStateChange={onEditorStateChange}
                  />
                  <input
                    className="add-article__input add-article__input-title"
                    type="text"
                    name="title"
                    placeholder="Enter a title"
                    onChange={onTitleChange}
                    value={title}
                  />
                  <input
                    className="add-article__input add-article__input-category"
                    type="text"
                    name="category"
                    placeholder="Enter the category name..."
                    onChange={onCategoryChange}
                    value={category}
                  />
                </div>
                <div className="add-article__btns">
                  <button
                    className="add-article__btn add-article__btn-publish"
                    onClick={onPublishArticle}
                  >
                    Publish an article
                  </button>
                  <label
                    className="add-article__btn add-article__btn-addPhoto"
                    htmlFor="photo"
                  >
                    Add Photo
                  </label>
                  <input
                    className="not_visible"
                    type="file"
                    name="image"
                    id="photo"
                    onChange={e => setImage(e.target.files[0])}/>
                </div>
              </div>
            </div>
          )
      }
    </div>
  );
};

// <div dangerouslySetInnerHTML={{ __html: markup }} />

export default AddArticle;
