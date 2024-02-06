const isMobile = () => {
  const agent = navigator.userAgent.toUpperCase();

  return (
    agent.indexOf('IPHONE') > -1 ||
    agent.indexOf('ANDROID') > -1 ||
    agent.indexOf('IPAD') > -1 ||
    agent.indexOf('IPOD') > -1
  );
};

export { isMobile };
