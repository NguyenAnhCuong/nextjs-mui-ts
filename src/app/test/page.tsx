import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";

const TestA = async () => {
  const res = await sendRequest<any>({
    url: `http://localhost:3000/api/test`,
    method: "GET",
    // nextOption: { cache: "no-store" },
    nextOption: {
      //   next: { revalidate: 10 },
      next: { tags: ["soundlcoud"] },
    },
  });

  return (
    <Container>
      <div>{JSON.stringify(res)}</div>
    </Container>
  );
};

export default TestA;
