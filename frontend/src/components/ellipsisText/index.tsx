import React from "react";

const EllipsisText = ({ content }: any) => {
  const lines = content.split("\n").slice(0, 3); // Limit to 3 lines
console.log(lines)
  return (
    <div className="ellipsis-text">
      {lines.map((line: any, index: any) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
      {content.split("\n").length > 3 && <span className="ellipsis">...</span>}
    </div>
  );
};

export default EllipsisText;
