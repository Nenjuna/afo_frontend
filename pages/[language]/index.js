import axios from "axios";
import List from "@mui/material/List";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Landing from "../../components/Landing";
import Box from "@mui/material/Box";
import Head from "next/head";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { QueryClient, dehydrate, useQuery } from "react-query";

function MoviesList(props) {
  const router = useRouter();
  const [page, setPage] = useState(parseInt(router.query.page) || 1);
  const [language, setLanguage] = useState(router.query.language || "tamil");

  // useEffect(() => {
  //   if (router.query.language !== "tamil") {
  //     router.push(`/about`, undefined, {
  //       shallow: true,
  //     });
  //   }
  // }, [language]);

  const { data } = useQuery(
    ["movie", page, language],
    async () => {
      const movies = await axios.get(
        "https://oyster-app-l4qvg.ondigitalocean.app/afo-backend/api/movies",
        {
          params: {
            language: language,
            page: page,
          },
        }
      );
      return movies.data;
    },
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  function handlePageChange(e, value) {
    setPage(value);
    router.push(`/${language}?page=${parseInt(value)}`, undefined, {
      shallow: true,
    });
  }
  const title = `Download latest ${language} movie songs - Free4Download.in`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <List>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexGrow: 1,
            paddingLeft: 5,
            maxWidth: {
              xs: "100%",
              md: "70%",
            },
            gap: "20px",
          }}
        >
          {data?.data.map((movie) => {
            return <Landing movie={movie} key={movie._id} />;
          })}
        </Box>
      </List>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexGrow: 1,
          paddingLeft: 5,
          maxWidth: {
            xs: "100%",
            md: "70%",
          },
          gap: "20px",
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={data?.count}
            variant="outlined"
            shape="rounded"
            color="primary"
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
      </Box>
    </>
  );
}

export default MoviesList;

export async function getServerSideProps(context) {
  let page = 1;
  let language = "tamil";
  let lanugages = ["tamil", "hindi", "telugu", "malayalam"];
  if (context.query.page) page = parseInt(context.query.page);
  if (context.query.language) language = context.query.language;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["movie", page, language], async () => {
    const movies = await axios.get(
      "https://oyster-app-l4qvg.ondigitalocean.app/afo-backend/api/movies",
      {
        params: {
          language: language,
          page: page,
        },
      }
    );
    return movies.data;
  });
  console.log(lanugages.includes(language));
  if (!lanugages.includes(language)) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  // console.log(queryClient);

  return { props: { dehydratedState: dehydrate(queryClient) } };
}
