import { Award, Sparkles, Truck } from 'lucide-react';
import React from 'react';

function WhyChooseUs() {
  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Our products are made from the finest materials ensuring durability and elegance."
    },
    {
      icon: Sparkles,
      title: "Authentic Craftsmanship", 
      description: "Each piece is handcrafted with attention to detail, blending tradition and creativity."
    },
    {
      icon: Truck,
      title: "Reliable Delivery",
      description: "Fast and secure delivery, right to your door—safely packed and handled with care."
    }
  ];

  return (
    <section className="py-16 text-Text bg-main/10" >
      <div className="max-w-6xl mx-auto text-center px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4" >
            Why Choose Reflawood?
          </h2>
          <p className="text-lg max-w-2xl mx-auto" >
            At Reflawood, we blend traditional craftsmanship with modern elegance to bring you 
            the finest tables and mirrors for your space.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div key={feature.title}>
                <div className="p-6  rounded-lg bg-white border-2 border-main" >
                  <div 
                    className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4"
                  >
                    <IconComponent className="w-6 h-6 text-white bg-main" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">
                    {feature.title}
                  </h3>
                  <p className='leading-8  '>
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;