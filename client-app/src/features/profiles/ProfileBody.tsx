import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import ProfilePhotos from "./details/ProfilePhotos";
import ProfileInfo from "./details/ProfileInfo";

interface Props {
  profile: Profile;
}

export default function ProfileBody({ profile }: Props) {
  const tabPanes = [
    { menuItem: "About", render: () => <ProfileInfo /> },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },    // remove prop profile & add from store
    { menuItem: "Events", render: () => <Tab.Pane>Events</Tab.Pane> },
    { menuItem: "Following", render: () => <Tab.Pane>Following</Tab.Pane> },
    { menuItem: "Followers", render: () => <Tab.Pane>Followers</Tab.Pane> },
  ];

  return (
    <Tab
      menuPosition="right"
      panes={tabPanes}
    />
  );
}
