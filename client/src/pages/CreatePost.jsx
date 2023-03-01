import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
   if(form.prompt){
    try {
      setGeneratingImg(true);
      const response = await fetch('http://localhost:8080/api/v1/pixel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: form.prompt }),
      });

      const data = await response.json();

      setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
    } catch (err) {
      alert(err);
    } finally {
      setGeneratingImg(false);
    }
   }else {
    alert('Please enter a prompt for generating images')
   }
  };

  const handleSubmit = async (e) => {
   e.preventDefault();

   if(form.prompt && form.photo){
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(form)
      })

      await response.json();
      navigate('/');
    } catch (err) {
      alert(err)
    } finally{
      setLoading(false)
    }
   }else{
    alert('Please enter a prompt and generate an image')
   }
  };

  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt })
  };

  return (
    <section className="max-w-7xl mx-auto text-center items-center">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Text To Image with AI Image Generator</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-full">
        Use PixelProduce to generate innovative and stunning images and share them with the vibrant community of users
        </p>
      </div>

      <form className="mt-16 max-w-full drop-shadow-lg" onSubmit={handleSubmit}>
      <div className="flex justify-center items-center gap-5 flex-col lg:flex-row">
        <div className="gap-5 w-full lg:w-2/4">
          <FormField
            lableName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., Nishant Kumar"
            value={form.name}
            handleChange={handleChange}
          />

      <div className="my-4">
      <FormField
            labelName="Start with a detailed description"
            type="text"
            name="prompt"
            placeholder="A futuristic cyborg dance club, neon lights"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
      </div>

            <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm sm:w-auto px-5 py-2.5 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-green-600 duration-300"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
          </div>

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center inset-x-0 bottom-0 ">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            **Once you have created the image you want, you can share it with
            others in the community**
          </p>

          <button 
          type="submit" 
          className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >{loading ? "Sharing..." : "Share with the community"}</button>

        </div>
      </form>

    </section>
  );
};

export default CreatePost;
