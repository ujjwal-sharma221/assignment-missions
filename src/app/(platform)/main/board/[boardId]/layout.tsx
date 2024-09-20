const BoardLayout = ({
  children,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  return <div>{children}</div>;
};

export default BoardLayout;
