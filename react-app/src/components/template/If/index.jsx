function If(props) {
    if (props.test) {
        return props.children;
    }
    return null;
}
export default If;
