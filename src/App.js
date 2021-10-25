import React, { Fragment } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import AddPostForm from "./features/post/AddPostForm";
import EditPostForm from "./features/post/EditPostForm";
import { Navbar } from "./app/Navbar";
import PostList from "./features/post/PostList";
import PostPage from "./features/post/PostPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Fragment>
                <AddPostForm />
                <PostList />
              </Fragment>
            )}
          />
          <Route exact path="/post/:postId" component={PostPage} />
          <Route exact path="/editpost/:postId" component={EditPostForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
