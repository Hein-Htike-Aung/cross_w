import pkg from 'lodash';

const { get } = pkg;

const getPaginationData = (query: any) => {
  const pageSize = get(query, 'pageSize') || 10;
  const page = get(query, 'page');

  const offset = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize);

  return {
    offset,
    limit,
    isPagination: !Number.isNaN(offset) && !Number.isNaN(limit),
  };
};

export default getPaginationData;
