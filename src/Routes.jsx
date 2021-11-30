import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navibar from "./components/Navibar";
import AuthContextProvider from "./contexts/AuthContext";
import ChatContextProvider from "./contexts/ChatContext";
import CommentContextProvider from "./contexts/CommentsContext";
import FeedbackContextProvider from "./contexts/FeedbackContext";
import HistoryContextProvider from "./contexts/HistoryContext";
import LikesContextProvider from "./contexts/LikesContext";
import ProductsContextProvider from "./contexts/ProductsContext";
import SubscribersContextProvider from "./contexts/SubscribersContext";
import ViewsContextProvider from "./contexts/ViewsContext";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import ChatPage from "./pages/ChatPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import FavoritesPage from "./pages/FavoritesPage";
import HistoryPage from "./pages/HistoryPage";
import MainPage from "./pages/MainPage";
import OrderPage from "./pages/OrderPage";
import ProductPage from "./pages/ProductPage";
import SubscribePage from "./pages/SubscribePage";
import ViewPage from "./pages/ViewPage";

const MyRoutes = () => {
  return (
    <AuthContextProvider>
      <ProductsContextProvider>
        <CommentContextProvider>
          <FeedbackContextProvider>
            <LikesContextProvider>
              <HistoryContextProvider>
                <ViewsContextProvider>
                  <SubscribersContextProvider>
                    <ChatContextProvider>
                      <BrowserRouter>
                        <Navibar />
                        <Routes>
                          <Route path="/" element={<MainPage />} />
                          <Route path="/chat" element={<AdminPage />} />
                          <Route path="/products" element={<ProductPage />} />
                          <Route path="/edit/:id" element={<EditPage />} />
                          <Route
                            path="/products/detail/:id"
                            element={<DetailPage />}
                          />
                          <Route path="/cart" element={<CartPage />} />
                          <Route
                            path="/favorites"
                            element={<FavoritesPage />}
                          />
                          <Route path="/order" element={<OrderPage />} />
                          <Route path="/history" element={<HistoryPage />} />
                          <Route path="/views" element={<ViewPage />} />
                          <Route
                            path="/subscribe"
                            element={<SubscribePage />}
                          />
                          <Route
                            path="/chat/:ownerMail"
                            element={<ChatPage />}
                          />
                        </Routes>
                      </BrowserRouter>
                    </ChatContextProvider>
                  </SubscribersContextProvider>
                </ViewsContextProvider>
              </HistoryContextProvider>
            </LikesContextProvider>
          </FeedbackContextProvider>
        </CommentContextProvider>
      </ProductsContextProvider>
    </AuthContextProvider>
  );
};

export default MyRoutes;
