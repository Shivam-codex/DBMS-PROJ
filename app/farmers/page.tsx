"use client";

import { useState } from "react";
import Image from "next/image";

const farmers = [
  {
    id: 1,
    farmer: "Shivam Shinde",
    name: "Green Valley Farm",
    description: "Family-owned organic farm specializing in vegetables and herbs.",
    location: "Ahilyanagar, Maharashtra",
    image: "https://images.pexels.com/photos/2280574/pexels-photo-2280574.jpeg?auto=compress&cs=tinysrgb&w=600",
    fullDescription: "Green Valley Farm has been operating since 2010, specializing in organic farming practices. We grow over 50 varieties of seasonal vegetables and medicinal herbs using sustainable methods that protect the environment.",
    contact: "shivam.shinde@greenvalley.com | +91 98765 43210",
    products: ["Organic vegetables", "Medicinal herbs", "Seasonal fruits"],
    practices: ["100% organic", "No chemical pesticides", "Water conservation"],
    certifications: ["India Organic", "Jaivik Bharat"],
    yearsActive: "Since 2010"
  },
  {
    id: 2,
    farmer: "Mrunali Shikhare",
    name: "Sunny Meadow Farm",
    description: "Free-range poultry and eggs from happy chickens. Poultry farming",
    location: "Mumbai, Maharashtra",
    image: "https://images.pexels.com/photos/4911739/pexels-photo-4911739.jpeg?auto=compress&cs=tinysrgb&w=600",
    fullDescription: "Sunny Meadow Farm raises chickens in open pastures with access to sunshine, fresh air, and plenty of space to roam. Our eggs are rich in nutrients and flavor, coming from chickens fed a natural diet.",
    contact: "mrunali@sunnymeadow.com | +91 87654 32109",
    products: ["Free-range eggs", "Pasture-raised chicken"],
    practices: ["Ethical animal treatment", "Non-GMO feed", "Antibiotic-free"],
    certifications: ["NPOP Organic", "Humane Certified"],
    yearsActive: "Since 2015"
  },
  {
    id: 3,
    farmer: "Sarthak Lekurwale",
    name: "Bee Happy Apiaries",
    description: "Sustainable honey production with a focus on bee conservation.",
    location: "Pune, Maharashtra",
    image: "https://media.istockphoto.com/id/471457418/photo/indian-senior-man.jpg?s=612x612&w=0&k=20&c=C4GwUXRuigge-wUxBLm1rqT0ldrCUW9Mpb-VtOEhxjM=",
    fullDescription: "Bee Happy Apiaries practices sustainable beekeeping methods that prioritize bee health and biodiversity. We harvest honey in small batches to ensure quality while maintaining healthy bee colonies.",
    contact: "omkar@beehappy.com | +91 76543 21098",
    products: ["Raw honey", "Bee pollen", "Propolis", "Beeswax products"],
    practices: ["Chemical-free hives", "Sustainable harvesting", "Wildflower foraging"],
    certifications: ["FSSAI Certified", "USDA Organic"],
    yearsActive: "Since 2012"
  },
  {
    id: 4,
    farmer: "Om Dhumkekar",
    name: "Golden Grain Farms",
    description: "Traditional rice varieties grown using ancient methods.",
    location: "Washim, Maharashtra",
    image: "https://images.pexels.com/photos/2519332/pexels-photo-2519332.jpeg?auto=compress&cs=tinysrgb&w=600",
    fullDescription: "Golden Grain Farms preserves heritage rice varieties that have been cultivated for generations. We use traditional farming techniques combined with modern organic practices to produce nutrient-dense grains.",
    contact: "om.dhumkekar@goldengrain.com | +91 65432 10987",
    products: ["Indigenous rice varieties", "Ancient grains", "Millets"],
    practices: ["Heritage seed preservation", "Natural pest control", "Crop rotation"],
    certifications: ["Geographical Indication (GI) tagged", "Organic Certified"],
    yearsActive: "Since 2008"
  },
  {
    id: 5,
    farmer: "Pratiksha Yadav",
    name: "Sunshine Acres",
    description: "Dairy farm producing fresh milk and artisanal cheeses.",
    location: "Kolhapur, Maharashtra",
    image: "https://images.pexels.com/photos/6231891/pexels-photo-6231891.jpeg?auto=compress&cs=tinysrgb&w=600",
    fullDescription: "Sunshine Acres is a small-scale dairy where cows are treated like family. We produce fresh, unadulterated milk and handcrafted cheeses using traditional European techniques adapted to local conditions.",
    contact: "pratiksha@sunshineacres.com | +91 54321 09876",
    products: ["Fresh milk", "Artisanal cheeses", "Yogurt", "Ghee"],
    practices: ["Grass-fed cows", "No growth hormones", "Small batch production"],
    certifications: ["FSSAI Certified", "Good Dairy Practices"],
    yearsActive: "Since 2017"
  },
  {
    id: 6,
    farmer: "Vaishnavi Tilekar",
    name: "Valley View Apiaries",
    description: "Specialty honeys from diverse floral sources.",
    location: "Pune, Maharashtra",
    image: "https://images.pexels.com/photos/5126979/pexels-photo-5126979.jpeg?auto=compress&cs=tinysrgb&w=600",
    fullDescription: "Valley View Apiaries produces single-origin honeys that capture the unique flavors of different floral landscapes. Our hives are placed in specific locations to create distinct honey varieties.",
    contact: "vaishnavi@valleyview.com | +91 43210 98765",
    products: ["Single-origin honeys", "Comb honey", "Royal jelly"],
    practices: ["Location-specific hives", "Minimal processing", "Bee-friendly habitats"],
    certifications: ["Organic Certified", "Slow Food Presidium"],
    yearsActive: "Since 2014"
  }
];

export default function FarmersPage() {
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  const handleSeeMore = (farmer) => {
    setSelectedFarmer(farmer);
  };

  const handleCloseModal = () => {
    setSelectedFarmer(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Our Farmers</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {farmers.map((farmer) => (
          <div 
            key={farmer.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-64">
              <Image
                src={farmer.image}
                alt={farmer.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{farmer.name}</h2>
              <p className="text-gray-600 mb-1">Farmer: {farmer.farmer}</p>
              <p className="text-gray-500 text-sm mb-4">{farmer.location}</p>
              <p className="mb-4">{farmer.description}</p>
              <button
                onClick={() => handleSeeMore(farmer)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-colors"
              >
                See More Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Farmer Details Modal */}
      {selectedFarmer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-96">
              <Image
                src={selectedFarmer.image}
                alt={selectedFarmer.name}
                fill
                className="object-cover"
              />
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-2">{selectedFarmer.name}</h2>
              <p className="text-xl text-gray-600 mb-6">Managed by {selectedFarmer.farmer}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Farm Details</h3>
                  <p className="mb-4">{selectedFarmer.fullDescription}</p>
                  <p className="mb-2"><span className="font-medium">Location:</span> {selectedFarmer.location}</p>
                  <p className="mb-2"><span className="font-medium">Years Active:</span> {selectedFarmer.yearsActive}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Products</h3>
                  <ul className="list-disc pl-5 space-y-1 mb-6">
                    {selectedFarmer.products.map((product, index) => (
                      <li key={index}>{product}</li>
                    ))}
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-4">Certifications</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedFarmer.certifications.map((cert, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Farming Practices</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedFarmer.practices.map((practice, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {practice}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                <p className="text-lg">{selectedFarmer.contact}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}