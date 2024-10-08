// import React, { Component } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import CustomEditor from "ckeditor5-custom-build/build/ckeditor";

// export const Editor = () => {
//   const editorConfiguration = {
//     toolbar: ["bold", "italic", "imageUpload"],
//     simpleUpload: {
//       uploadUrl: "https://api.imgur.com/3/image",
//       headers: {
//         Authorization: "Client-ID 08be59f077e0df4",
//       },
//     },
//   };

//   return (
//     <div>
//       <h2>Using CKEditor 5 build in React</h2>
//       <CKEditor
//         editor={CustomEditor}
//         data=""
//         config={editorConfiguration}
//         onReady={(editor) => {
//           // console.log("Editor is ready to use!", editor);
//         }}
//         onChange={(event, editor) => {
//           const data = editor.getData();
//           console.log({ data });
//         }}
//         onBlur={(event, editor) => {
//           // console.log("Blur.", editor);
//         }}
//         onFocus={(event, editor) => {
//           // console.log("Focus.", editor);
//         }}
//       />
//     </div>
//   );
// };
