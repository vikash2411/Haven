// app/api/categories/route.js
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma'; // Adjust the path to the correct location

async function getsample() {
  const serviceProviders = await prisma.serviceProvider.findMany({
    select: {
      service_provider_id: true, // Primary key
      name: true,
      phone_number: true,
      email: true,
      registration_date: true,
      about_me: true,
      plans: true,
      images: true,
      bookings: true,            // Include booking details if needed
      favorites: true,           // Include favorites if needed
      category: true             // Include the new category field
    },
  });
  const getServiceProvider = serviceProviders.map((serviceProvider) => {
    return {
      id: serviceProvider.service_provider_id, // Keeping the id as a number
      name: serviceProvider.name,
      phone_number: serviceProvider.phone_number,
      email: serviceProvider.email,
      registration_date: serviceProvider.registration_date,
      about_me: serviceProvider.about_me,
      plans: serviceProvider.plans,
      images: serviceProvider.images,
      bookings: serviceProvider.bookings,       // You can modify how you want to structure this
      favorites: serviceProvider.favorites,     // You can modify how you want to structure this
      category: (serviceProvider.category) // Parse the category JSON string into an object
    };
  });
  

  return getServiceProvider;
}


export async function GET() {
   
  const sample= await getsample();
 
  
  
    const sampleBuisnessList = [
        {
          id: "1",
          name: "HealthCare Clinic",
          images: [
            {
              url: "/images/healthcare-clinic.jpg"
            }
          ],
          category: {
            name: "Medical"
          },
          contactPerson: "Dr. John Doe",
          price:500,
          rating:4,
          address: "123 Health St, Wellness City"
        }
        
      ];
      

  return NextResponse.json(sample);
}