import {
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
} from "@mantine/core";
import classes from "./reviews.module.css";
import Marquee from "react-fast-marquee";

const data = [
  {
    name: "Jacob Warnhalter",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "This job portal has been an absolute game-changer for me. It's user-friendly interface and comprehensive job listings made my job search a breeze. The filtering options helped me narrow down opportunities matching my skills. Highly recommended!",
  },
  {
    name: "Isabella Brown",
    avatar:
      "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "What sets this job portal apart is its commitment to assisting job seekers. The career resources, tips, and guidance available on the platform are incredibly helpful. The support team is responsive and provided me with valuable insights, making my job hunt more targeted and successful.",
  },
  {
    name: "John Doe",
    avatar:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "I appreciate how this portal customizes job suggestions based on my profile and interests. It's not just a job board; it's a networking hub. The ability to connect with recruiters and other professionals in my field has been invaluable. A fantastic platform for building connections",
  },
  {
    name: "Sarah Thompson",
    avatar:
      "https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "I was pleasantly surprised by the simplicity of the application process. Uploading my resume and cover letter was seamless, and the portal's tracking feature kept me informed about the status of my applications. It's truly one of the best job portals I've used.",
  },
];
export function Reviews() {
  return (
    <>
      <h1 className="mx-5 mb-2 mt-10 text-xl font-bold">
        Hear what others say about us
      </h1>
      <Marquee speed={50} gradient={false} pauseOnHover={true}>
        <div className="flex overflow-x-auto">
          {data.map((item) => (
            <Paper
              withBorder
              radius="md"
              className={`shrink-0 w-80 m-4 ${classes.comment}`}
              key={item.name}
            >
              <Group>
                <Avatar
                  size={50}
                  src={item.avatar}
                  alt="Jacob Warnhalter"
                  radius="xl"
                />
                <div>
                  <Text fz="sm" className="text-lg">
                    {item.name}
                  </Text>
                </div>
              </Group>
              <TypographyStylesProvider className={classes.body}>
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{
                    __html: `<p>${item.description}</p>`,
                  }}
                />
              </TypographyStylesProvider>
            </Paper>
          ))}
        </div>
      </Marquee>
    </>
  );
}
