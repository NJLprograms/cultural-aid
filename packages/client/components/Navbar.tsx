import { Box, Flex } from "@chakra-ui/layout";
import { Button, Fade } from "@chakra-ui/react";
import { ImageAnalysisService, UserService } from "@cultural-aid/core/services";

import Link from "next/link";
import React from "react";
import { analysisSelector } from "@cultural-aid/core/redux/selectors/analysisSelector";
import { useSelector } from "react-redux";
import { userSelector } from "@cultural-aid/core/redux/selectors/userSelector";

const repoURL = "https://github.com/NJLprograms/cultural-aid";

export const NavBar = () => {
  const { value: user } = useSelector(userSelector);
  const { value: analysis } = useSelector(analysisSelector);
  return (
    <>
      <Box className="navbar">
        <Flex justifyContent="space-between">
          <Flex
            ml={1}
            flexDir="column"
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Link href={repoURL}>
              <Box mt={1} cursor="pointer">
                <GithubSVG />
              </Box>
            </Link>
          </Flex>
          <Flex
            justifyContent="flex-end"
            alignItems="center"
            height="100%"
            mr={["3", "6"]}
          >
            {user && (
              <Fade in>
                {analysis && (
                  <Button
                    m="1"
                    onClick={() => ImageAnalysisService.ResetAnalysis()}
                  >
                    New
                  </Button>
                )}
                <Button m="1" onClick={() => UserService.Logout()}>
                  Logout
                </Button>
              </Fade>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

const GithubSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 24 24"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);
