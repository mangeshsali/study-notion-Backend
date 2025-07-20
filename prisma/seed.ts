import db from "../src/utils/db";

const main = async () => {
  const categories = [
    {
      name: "Web Development",
      description:
        "Learn to build responsive websites and web apps using HTML, CSS, JavaScript, and modern frameworks.",
    },
    {
      name: "Mobile Development",
      description:
        "Develop cross-platform mobile applications using tools like React Native, Flutter, and native SDKs.",
    },
    {
      name: "Data Science",
      description:
        "Analyze data, build models, and gain insights using Python, R, SQL, and machine learning techniques.",
    },
    {
      name: "AI/ML",
      description:
        "Master artificial intelligence and machine learning concepts, algorithms, and practical implementations.",
    },
  ];

  for (const category of categories) {
    await db.category.upsert({
      where: { name: category.name },
      update: {},
      create: {
        name: category.name,
        description: category.description,
      },
    });
  }

  console.log("Categories seeded successfully.");
  await db.$disconnect();
  process.exit(0);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
