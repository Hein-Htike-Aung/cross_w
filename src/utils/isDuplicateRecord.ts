const isDuplicatedRecord = <T extends { id: number }>(
  targetObj: T | null | undefined,
  id: string,
) => {
  return targetObj && +targetObj.id !== +id;
};

export default isDuplicatedRecord;
