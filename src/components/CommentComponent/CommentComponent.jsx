import React from "react";

const CommentComponent = (props) => {
  const { dataHref } = props;
  return (
    <div
      className="fb-comments"
      data-href={dataHref}
      data-width="100%"
      data-numposts="5"
    ></div>
  );
};

export default CommentComponent;
