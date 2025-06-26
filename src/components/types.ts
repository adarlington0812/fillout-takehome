export interface Position {
 x: number;
 y: number;
}

export type ActionType = {
 id: 'setFirst' | 'rename' | 'copy' | 'duplicate' | 'delete';
 label: string;
};

export type SettingsMenuType = {
 id: string;
 position: Position;
} | null;
