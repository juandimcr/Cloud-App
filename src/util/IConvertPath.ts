// Imports

// Interface
// Strategy pattern to convert the path sent by the client to a path understood by the filesystem
interface IConvertPath {
    convertPath(path: string): string;
}

// Export
export default IConvertPath;