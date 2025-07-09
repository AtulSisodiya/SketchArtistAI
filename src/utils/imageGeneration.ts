export interface SketchRequest {
  prompt: string;
  apiToken: string;
}

export interface SketchResult {
  imageUrl: string;
  timestamp: number;
  prompt: string;
  id: string;
}

const enhancePromptForPoliceSketch = (userPrompt: string): string => {
  const policeContext = [
    "Create a detailed police sketch, black and white pencil drawing style,",
    "professional forensic artwork, realistic facial features,",
    "suitable for law enforcement identification purposes.",
    "Focus on clear, distinctive facial characteristics.",
    "Style: police composite sketch, hand-drawn appearance,",
    "high contrast, detailed shading."
  ].join(" ");

  return `${policeContext} Subject description: ${userPrompt}`;
};

export const generateSketch = async ({ prompt, apiToken }: SketchRequest): Promise<SketchResult> => {
  const enhancedPrompt = enhancePromptForPoliceSketch(prompt);
  
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: enhancedPrompt,
          parameters: {
            num_inference_steps: 8,
            guidance_scale: 3.5,
            width: 512,
            height: 512,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    
    const result: SketchResult = {
      imageUrl,
      timestamp: Date.now(),
      prompt: prompt,
      id: `sketch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    // Store in localStorage for history
    const existingSketches = JSON.parse(localStorage.getItem('sketch-history') || '[]');
    const updatedSketches = [result, ...existingSketches].slice(0, 10); // Keep last 10
    localStorage.setItem('sketch-history', JSON.stringify(updatedSketches));

    return result;
  } catch (error) {
    console.error('Error generating sketch:', error);
    throw error;
  }
};

export const downloadSketch = (imageUrl: string, filename: string = `sketch-${Date.now()}.png`) => {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = filename;
  link.click();
};

export const printSketch = (imageUrl: string) => {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Police Sketch Print</title>
          <style>
            body { 
              margin: 0; 
              padding: 20px; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              min-height: 100vh;
              font-family: Arial, sans-serif;
            }
            .print-container {
              text-align: center;
            }
            img { 
              max-width: 100%; 
              height: auto; 
              border: 2px solid #333;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .header {
              margin-bottom: 20px;
              font-size: 18px;
              font-weight: bold;
              color: #333;
            }
            .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <div class="header">POLICE SKETCH - CONFIDENTIAL</div>
            <img src="${imageUrl}" alt="Police Sketch" />
            <div class="footer">Generated: ${new Date().toLocaleString()}</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
};