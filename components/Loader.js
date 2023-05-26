export default function LoadingIndicator() {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9999,
            }}
        >
            <div style={{ color: 'white', fontSize: 24 }}>Loading...</div>
        </div>
    );
}
