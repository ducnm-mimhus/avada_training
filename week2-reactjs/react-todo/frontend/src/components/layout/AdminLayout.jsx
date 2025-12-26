import { useState, useCallback } from "react";
import { AppProvider, Frame, Navigation, TopBar } from "@shopify/polaris";
import {
  HomeIcon,
  OrderIcon,
  ProductIcon,
  ExitIcon,
} from "@shopify/polaris-icons";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";

function AdminShell({ children, searchValue, onSearchChange }) {
  // --- STATE QUẢN LÝ MENU MOBILE ---
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  // --- STATE QUẢN LÝ USER MENU ---
  const [userMenuActive, setUserMenuActive] = useState(false);
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((active) => !active),
    []
  );

  // 1. Cấu hình Logo
  const logo = {
    width: 124,
    topBarSource:
      "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999",
    url: "#",
    accessibilityLabel: "Jaded Pixel",
  };

  // 2. Cấu hình User Menu (Góc phải trên cùng)
  const userMenuActions = [
    {
      items: [
        {
          content: "Sign out",
          icon: ExitIcon,
          onAction: () => alert("Sign out logic"),
        },
      ],
    },
  ];

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="Minh Duc"
      detail="NodeJS Intern"
      initials="MD"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={onSearchChange}
      value={searchValue}
      placeholder="Search..."
      showFocusBorder
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
      searchField={searchFieldMarkup}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        separator
        title="Apps"
        items={[
          {
            label: "Todo App",
            icon: HomeIcon,
            selected: true,
          },
          {
            label: "Orders",
            icon: OrderIcon,
            onClick: () => alert("Hi hi"),
          },
          {
            label: "Products",
            icon: ProductIcon,
            onClick: () => alert("Ha ha"),
          },
        ]}
      />
    </Navigation>
  );

  // --- RENDER ---
  return (
    <AppProvider i18n={enTranslations}>
      <Frame
        logo={logo}
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
        searchField={searchFieldMarkup}
      >
        {children}
      </Frame>
    </AppProvider>
  );
}

export default AdminShell;
