// app/api/categories/route.js
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

async function getsample() {
  const serviceProviders = await prisma.serviceProvider.findMany({
    select: {
      service_provider_id: true, // Primary key
      category: true             // Include only the category field
    },
  });

  const categories = serviceProviders.map((serviceProvider) => {
    return {
      id: serviceProvider.service_provider_id, // Keeping the id as a number
      category: serviceProvider.category         // Assuming category is already an object
    };
  });

  return categories; // Return only the formatted categories
}



export async function GET() {
  const sampleList1 = await getsample();
  console.log(sampleList1);
  const sampleList = [
    {
      name: "Other",
      icon: {
        url: "/icons/other-icon.png"
      }
    }
  ];

  return NextResponse.json(sampleList1);
}
