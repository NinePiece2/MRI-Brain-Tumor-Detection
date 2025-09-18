"use client";

import Link from "next/link";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0 0 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd"/>
  </svg>
);

export default function Home() {
  return (
    <div className="items-center justify-items-center relative pt-16">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <section className="flex flex-col gap-6 items-start p-8 border rounded-xl shadow-lg bg-[#F3F3F2] max-w-4xl">
          <h1 className="text-3xl font-semibold">Computer Vision in Medical MRI Brain Tumor Analysis</h1>

          <Link
            href="https://github.com/NinePiece2/MRI-Brain-Tumor-Detection"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="github-icon flex flex-col items-center group">
              <GithubIcon className="w-10 h-10 mb-1 transition-colors group-hover:text-green-600 text-black" />
              <span className="font-medium transition-colors group-hover:text-green-600 text-black">View on GitHub</span>
            </div>
          </Link>


          <p className="text-gray-700 leading-relaxed" style={{textAlign: 'left'}}>
            Brain tumor diagnosis is a critical medical process that relies heavily on precise analysis of Magnetic Resonance Imaging (MRI) scans. Each scan captures intricate details of brain tissue, where subtle differences in intensity values can signal abnormalities, such as tumors. However, manually analyzing these scans is time-consuming and prone to human error, especially given the tumor shape, size, and location variability. Advances in computer vision and deep learning have paved the way for automated solutions capable of addressing these challenges by leveraging large datasets and sophisticated algorithms.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Dataset</h2>
          <ul className="text-gray-700 leading-relaxed list-disc pl-5" style={{textAlign: 'left'}}>
            <li><b>Classification:</b> The dataset used was the <Link className="text-blue-600 hover:text-emerald-500" href="https://www.kaggle.com/datasets/masoudnickparvar/brain-tumor-mri-dataset" target="_blank" rel="noopener noreferrer">Brain Tumor MRI Dataset</Link></li>
            <li><b>Segmentation:</b> The dataset used was the <Link className="text-blue-600 hover:text-emerald-500" href="https://www.kaggle.com/datasets/mateuszbuda/lgg-mri-segmentation" target="_blank" rel="noopener noreferrer">Brain MRI Segmentation Dataset</Link></li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">Classification</h2>
          <p className="text-gray-700 leading-relaxed" style={{textAlign: 'left'}}>
            To classify tumor types, a pre-trained ResNet model, fine-tuned on MRI data, is used. The CNN&apos;s feature extraction layers are complemented by dense layers for decision-making, ensuring robust performance.
          </p>
          {/* <p className="text-gray-700 leading-relaxed">

          </p> */}

          <h2 className="text-2xl font-semibold mt-6">Segmentation</h2>
          <p className="text-gray-700 leading-relaxed" style={{textAlign: 'left'}}>
            A U-Net model was implemented to delineate brain tumor regions from MRI scans. This model leverages its encoder-decoder architecture to retain spatial context while producing pixel-level segmentation. The training involved optimizing the Dice loss function to handle class imbalances in medical datasets.
          </p>
          {/* <p className="text-gray-700 leading-relaxed">

          </p> */}

          <h2 className="text-2xl font-semibold mt-6">Conclusion</h2>
            <ul className="text-gray-700 leading-relaxed list-disc pl-5" style={{textAlign: 'left'}}>
            <li>
              <strong>Summary:</strong> This project successfully automated brain tumor identification and classification from MRI scans, achieving high accuracy and usability. The developed system supports clinicians by providing precise, reliable, and timely diagnostics.
            </li>
            <li>
              <strong>Limitations:</strong> Despite its strengths, the system relies heavily on the quality of MRI data and requires further validation of clinical datasets for broader deployment.
            </li>
            <li>
              <strong>Future Work:</strong> Future improvements include expanding to other medical imaging modalities and tumor types, enhancing interpretability features, and incorporating real-time processing capabilities.
            </li>
            </ul>
        </section>
      </main>
    </div>
  );
}