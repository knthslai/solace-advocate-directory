import { faker } from "@faker-js/faker";

const specialties = [
  "Bipolar",
  "LGBTQ",
  "Medication/Prescribing",
  "Suicide History/Attempts",
  "General Mental Health (anxiety, depression, stress, grief, life transitions)",
  "Men's issues",
  "Relationship Issues (family, friends, couple, etc)",
  "Trauma & PTSD",
  "Personality disorders",
  "Personal growth",
  "Substance use/abuse",
  "Pediatrics",
  "Women's issues (post-partum, infertility, family planning)",
  "Chronic pain",
  "Weight loss & nutrition",
  "Eating disorders",
  "Diabetic Diet and nutrition",
  "Coaching (leadership, career, academic and wellness)",
  "Life coaching",
  "Obsessive-compulsive disorders",
  "Neuropsychological evaluations & testing (ADHD testing)",
  "Attention and Hyperactivity (ADHD)",
  "Sleep issues",
  "Schizophrenia and psychotic disorders",
  "Learning disorders",
  "Domestic abuse",
];

const degrees = ["MD", "PhD", "MSW", "PsyD", "LCSW", "LPC", "LMFT", "LMHC"];

// Generate random specialties for each advocate
const getRandomSpecialties = (min: number = 1, max: number = 6) => {
  const numSpecialties = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...specialties].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numSpecialties);
};

// Generate a single advocate with realistic data
const generateAdvocate = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    city: faker.location.city(),
    degree: faker.helpers.arrayElement(degrees),
    specialties: getRandomSpecialties(),
    yearsOfExperience: faker.number.int({ min: 1, max: 30 }),
    phoneNumber: faker.number.int({ min: 1000000000, max: 9999999999 }),
  };
};

// Generate a large dataset of advocates
export const generateLargeDataset = (count: number = 10000) => {
  console.log(`🔧 Generating ${count} advocates...`);

  const advocates = [];
  for (let i = 0; i < count; i++) {
    advocates.push(generateAdvocate());

    // Log progress every 1000 records
    if ((i + 1) % 1000 === 0) {
      console.log(`   Generated ${i + 1}/${count} advocates...`);
    }
  }

  console.log(`✅ Generated ${count} advocates successfully!`);
  return advocates;
};

// Export for direct usage
export const largeAdvocateDataset = {
  generate: generateLargeDataset,
  small: () => generateLargeDataset(1000),
  medium: () => generateLargeDataset(5000),
  large: () => generateLargeDataset(10000),
  xlarge: () => generateLargeDataset(25000),
};
