"use client";

import { useState, FormEvent } from "react";

export default function Home() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [segmentedImageUrl, setSegmentedImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setSegmentedImageUrl(null);
      setShowModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    setLoading(true); // Start loading

    try {
      const response = await fetch("/api/uploadImageForSegmentation", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setSegmentedImageUrl(imageUrl);
      } else {
        setSegmentedImageUrl(null);
        const errorData = await response.json();
        console.error("Error from segmentation API:", errorData);
      }
    } catch (error) {
      console.error("An error occurred while processing the image:", error);
      setSegmentedImageUrl(null);
    } finally {
      setLoading(false); // Stop loading
      setShowModal(true); // Show modal with result
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSegmentedImageUrl(null);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 relative">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 items-center p-8 border rounded-lg shadow-lg bg-white"
        >
          <h1 className="text-2xl font-semibold">Upload an Image for Segmentation</h1>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-500 file:text-white hover:file:bg-green-600"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Loading...
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4">Segmentation Result</h2>
            {segmentedImageUrl ? (
              <img
                src={segmentedImageUrl}
                alt="Segmented result"
                className="mb-6 max-w-full h-auto border rounded-md shadow-md justify-self-center"
              />
            ) : (
              <p className="text-gray-700 mb-6">An error occurred during segmentation.</p>
            )}
            <button
              onClick={closeModal}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
