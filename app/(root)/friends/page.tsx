import ConversationFallback from "@/components/shared/conversation/ConversationFallback";
import ItemList from "@/components/shared/item-list/ItemList";

const FriendsPage = () => {
  return (
    <>
      <ItemList title='Friends'>Friends Page</ItemList>
      <ConversationFallback />
    </>
  );
};

export default FriendsPage;
