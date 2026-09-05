import InstagramChatRoom from "@/components/chat/InstagramChatRoom";

export default async function UserChatPage(props: { params: Promise<{ userId: string }> }) {
  const params = await props.params;
  return <InstagramChatRoom initialUserId={params.userId} />;
}
