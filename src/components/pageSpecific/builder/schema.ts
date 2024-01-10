import { Inputs } from "@/types/builder";
import { ZodType, z } from "zod";

const Basics = z.object({
  name: z.string().trim().min(1, { message: "Name is Required" }),
  label: z.string().trim().min(1, { message: "Label is Required" }),
  image: z.string(),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is Required" })
    .email("Invalid Email"),
  phone: z.string(),
  url: z.string(),
  summary: z.string(),
  location: z.object({
    address: z.string(),
    postalCode: z.string(),
    city: z.string(),
    countryCode: z.string(),
    region: z.string(),
  }),
  profiles: z.array(
    z.object({
      network: z.string(),
      username: z.string(),
      url: z.string(),
    })
  ),
});

const Work = z.array(
  z.object({
    id: z.string(),
    name: z.string().trim().min(1, { message: "Name is Required" }),
    position: z.string(),
    url: z.string(),
    startDate: z.string(),
    isWorkingHere: z.boolean(),
    endDate: z.union([z.string(), z.null()]),
    summary: z.string(),
    years: z.string(),
  })
);

const Education = z.array(
  z.object({
    id: z.string(),
    institution: z.string().trim().min(1, { message: "Name is Required" }),
    url: z.string(),
    studyType: z.string(),
    area: z.string(),
    startDate: z.string(),
    isStudyingHere: z.boolean(),
    endDate: z.union([z.string(), z.null()]),
    score: z.string(),
  })
);

const Projects = z.array(
  z.object({
    id: z.string(),
    name: z.string().trim().min(1, { message: "Name is Required" }),
    url: z.string(),
    languages: z.string(),
    description: z.string(),
  })
);

const Awards = z.array(
  z.object({
    id: z.string(),
    title: z.string().trim().min(1, { message: "Title is Required" }),
    date: z.string(),
    url: z.string(),
    awarder: z.string(),
    summary: z.string(),
  })
);

const skills = z.object({
  core: z.array(
    z.object({
      name: z.string(),
      level: z.number(),
      keywords: z.array(z.string()),
    })
  ),
  interests: z.array(
    z.object({
      name: z.string(),
    })
  ),
  languages: z.array(
    z.object({
      name: z.string(),
      level: z.number(),
    })
  ),
  frameworks: z.array(
    z.object({
      name: z.string(),
      level: z.number(),
    })
  ),
  technologies: z.array(
    z.object({
      name: z.string(),
      level: z.number(),
    })
  ),
  libraries: z.array(
    z.object({
      name: z.string(),
      level: z.number(),
    })
  ),
  databases: z.array(
    z.object({
      name: z.string(),
      level: z.number(),
    })
  ),
  tools: z.array(
    z.object({
      name: z.string(),
      level: z.number(),
    })
  ),
  mask: z.object({
    interests: z.string(),
    languages: z.string(),
    frameworks: z.string(),
    technologies: z.string(),
    libraries: z.string(),
    databases: z.string(),
    tools: z.string(),
  })
});

const mask = z.object({
  basics: z.string(),
  skills: z.string(),
  work: z.string(),
  education: z.string(),
  projects: z.string(),
  awards: z.string(),
});

// export const schema = z.object({
export const schema: ZodType<Inputs> = z.object({
  basics: Basics,
  skills: skills,
  work: Work,
  education: Education,
  projects: Projects,
  awards: Awards,
  mask: mask,
});
