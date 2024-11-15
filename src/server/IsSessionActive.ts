const isSessionTokenActive = async (data: any) => {
  try {
    const response = await fetch(
      `${data.instanceUrl}/services/oauth2/userinfo`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.ok) {
      const result = await response.json();
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    return { success: false };
  }
};

export default isSessionTokenActive;
