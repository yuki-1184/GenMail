import React, { useEffect, useState } from "react";
import NewEmail from "../components/Email/NewEmail";
import {
  Text,
  Box,
  Select,
  Grid,
  GridItem,
  Flex,
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorModeValue,
} from "@chakra-ui/react";
import ReviewEmail from "../components/Email/ReviewEmail";
import { useTranslation } from "react-i18next";
import EditArea from "../components/EditArea";
import Sidebar from "../components/SideBar";
import NewSns from "../components/SNS/NewSns";
import ReplyChat from "../components/Chat/ReplyChat";
import { ArrowRightIcon } from "@chakra-ui/icons";
import LanguageInputOutput from "../components/common/LanguageInputOutput";

const ChatPage = () => {
  const [generateOption, setGenerateOption] = useState("Reply");
  const [language, setLanguage] = useState("ja");
  const { t, i18n } = useTranslation();

  function GenerateOptionTitle() {
    switch (generateOption) {
      case "New":
        return t("chat.newChat.pageTitle");
      case "Reply":
        return t("chat.replyChat.pageTitle");
      case "Review":
        return t("chat.reviewChat.pageTitle");
      default:
        return t("chat.newChat.pageTitle");
    }
  }

  const Tab_Bg = useColorModeValue("white", "gray.700")
  const Tab_Color = useColorModeValue("black", "white")
  const TabPanel_Bg = useColorModeValue("white", "gray.700")
  const TabPanel_Border = useColorModeValue("#e2e8f0", "gray.600")

  return (
    <Grid templateColumns={"repeat(5, 1fr)"}>
      <GridItem colSpan={3}>
        <Box margin="10px 20px 0px 20px">
          {/* <Select mb='20px' onChange={(e) => setGenerateOption(e.target.value)} w='300px'>
                        <option value='Reply'>💬 {t("chat.replyChat.option")}</option>
                    </Select> */}
          <Tabs variant="enclosed">
            <TabList>
              <Tab
                bg={generateOption === "Reply" ? Tab_Bg : "transparent"}
                onClick={(e) => setGenerateOption("Reply")}
              >
                <Text color={generateOption === "Reply" ? Tab_Color : "gray.600"}>
                  {t("chat.replyChat.option")}
                </Text>
              </Tab>
            </TabList>
            <TabPanels bg={TabPanel_Bg}>
              <TabPanel border="1px solid" borderColor={TabPanel_Border}>
                <ReplyChat lang={language} setLanguage={setLanguage} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>
      <GridItem colSpan={2}>
        <Box margin="10px 20px 0px 0px">
          <EditArea></EditArea>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ChatPage;