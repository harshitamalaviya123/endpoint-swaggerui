import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/premium-contacts-api",
    },
    {
      type: "category",
      label: "Contacts",
      items: [
        {
          type: "doc",
          id: "api/retrieve-all-contacts",
          label: "Retrieve all contacts",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/create-a-new-contact",
          label: "Create a new contact",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-a-contact-by-id",
          label: "Get a contact by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/update-an-existing-contact",
          label: "Update an existing contact",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/delete-a-contact",
          label: "Delete a contact",
          className: "api-method delete",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
