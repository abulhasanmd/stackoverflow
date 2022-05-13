const handleSorting = (sortType, page = '') => {
  let temp = sortType;

  if (page === 'users' && temp === 'Name') {
    temp = 'Username';
  } else if (page === 'users' && temp === 'Popular') {
    temp = 'Popular users';
  }

  switch (temp) {
    case 'Newest':
      return (a, b) => new Date(b.createdOn) - new Date(a.createdOn);
    case 'New':
      return (a, b) => new Date(b.createdOn) - new Date(a.createdOn);
    case 'New Users':
      return (a, b) => new Date(b.createdOn) - new Date(a.createdOn);
    case 'Top':
      return (a, b) =>
        b.answer_count + b.comment_count - (a.answer_count + a.comment_count);
    case 'Active':
      return (a, b) =>
        b.posts_count + b.tags_count - (a.posts_count + a.tags_count);
    case 'Views':
      return (a, b) => b.views - a.views;
    case 'Oldest':
      return (a, b) => new Date(a.createdOn) - new Date(b.createdOn);
    case 'Popular':
      return (a, b) => b.posts_count - a.posts_count;
    case 'Reputation':
      return (a, b) => b.reputation - a.reputation;
    case 'Name':
      return (a, b) => a.name.localeCompare(b.name);
    case 'Username':
      return (a, b) => a.username.localeCompare(b.username);
    case 'Popular users':
      return (a, b) => b.views - a.views;
    case 'Hot':
      return (a, b) => b.views - a.views;
    case 'Score':
      return (a, b) => b.score - a.score;
    case 'Interesting':
      return (a, b) => new Date(b.modifiedOn) - new Date(a.modifiedOn);
    case 'Unanswered':
        return (a, b) => a.answersCount - b.answersCount;
    default:
      break;
  }
};

export default handleSorting;
