// import React, { useState, useEffect } from "react";
// import joi from "joi";

// import {
//   getMusicById,
//   addMusic,
//   updateMusic,
// } from "../../musicactions/musicsservice";
// import { useNavigate, useParams } from "react-router-dom";

// const MusicForm = () => {
//   const [data, setData] = useState({ title: "", artist: "" });
//   const [errors, setErrors] = useState({});
//   const [param, setParam] = useState("");
//   const schema = {
//     title: joi.string().required(),
//     artist: joi.string().required(),
//   };
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     setParam(id);
//     if (id !== "new") {
//       try {
//         const fetchData = async () => {
//           const { data: music } = await getMusicById(id);
//           const newData = {
//             title: music.title,
//             artist: music.artist,
//           };
//           setData(newData);
//         };
//         fetchData();
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }, [id]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const errors = validate();
//     setErrors(errors || {});
//     if (errors) return;

//     try {
//       let response;
//       if (param === "new") response = await addMusic(data);
//       else response = await updateMusic(param, data);
//       console.log(param, data);
//       navigate("/musics");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     const newData = { ...data };
//     newData[name] = value;
//     setData(newData);
//   };

//   const validate = () => {
//     const { error } = joi.object(schema).validate(data, { abortEarly: false });
//     if (!error) return null;

//     const errors = {};
//     for (let item of error.details) errors[item.path[0]] = item.message;
//     return errors;
//   };

//   return (
//     <div className="Full Screen">
//       <form onSubmit={handleSubmit}>
//         <div>
//           Music details
//           <div>
//             <input
//               type="text"
//               name="title"
//               className="input"
//               value={data.title}
//               onChange={handleChange}
//             />
//             {errors.title && (
//               <div className="alert alert-danger">{errors.title}</div>
//             )}
//           </div>
//           <div>
//             <input
//               type="text"
//               name="artist"
//               className="input"
//               value={data.artist}
//               onChange={handleChange}
//             />
//             {errors.artist && (
//               <div className="alert alert-danger">{errors.artist}</div>
//             )}
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="btn btn-primary"
//               disabled={Object.keys(errors).length > 0}
//             >
//               {param === "new" ? "Add Music" : "Update"}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MusicForm;
