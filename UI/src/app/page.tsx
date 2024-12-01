"use client";

export default function Home() {
  return (
    <div className="items-center justify-items-center relative pt-16">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <section className="flex flex-col gap-6 items-start p-8 border rounded-lg shadow-lg bg-white" style={{width: '80vw'}}>
          <h1 className="text-3xl font-semibold">Computer Vision in Medical MRI Brain Tumor Analysis</h1>
          <p className="text-gray-700 leading-relaxed" style={{textAlign: 'left'}}>
            Brain tumor diagnosis is a critical medical process that relies heavily on precise analysis of Magnetic Resonance Imaging (MRI) scans. Each scan captures intricate details of brain tissue, where subtle differences in intensity values can signal abnormalities, such as tumors. However, manually analyzing these scans is time-consuming and prone to human error, especially given the tumor shape, size, and location variability. Advances in computer vision and deep learning have paved the way for automated solutions capable of addressing these challenges by leveraging large datasets and sophisticated algorithms.
          </p>

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