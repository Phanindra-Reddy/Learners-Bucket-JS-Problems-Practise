function useCopy() {
  const [copiedText, setCopiedText] = useState();

  async function copy(text) {
    if (!navigator.clipboard) {
      console.log("Clipboard not supported.");
      return false;
    }

    try {
      await navigator.clipboard(text);
      setCopiedText(text);
    } catch (error) {
      console.log(`Failed copying the text ${text}`, error);
      setCopiedText(null);
    }
  }

  return [copiedText, copy];
}

export default useCopy;
