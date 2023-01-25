import {useState, UIEvent, useCallback} from "react";

interface OwnProps {
    rowHeight?: number;
    tableHeight?: number;
    rows: {[key: string]: string}[]
}
const Table = ({rowHeight = 50, tableHeight = 700, rows}: OwnProps) => {
    const columns = Object.keys(rows[0])
    const stateTableHeight = (rowHeight * rows.length)
    const [scroll, setScroll] = useState({
        top: 0,
        index: 0,
        end: Math.ceil((tableHeight * 2) / rowHeight)
    })

    const onScroll = useCallback(({ currentTarget }: UIEvent<HTMLTableElement>) => {

        let scrollTop = currentTarget.scrollTop
        let index = Math.floor(scrollTop / rowHeight)

        const newScroll = {
            index,
            end: index + Math.ceil((tableHeight * 2) / rowHeight),
            top: (scrollTop / rowHeight) * rowHeight
        }

        setScroll(() => newScroll);
    },[rowHeight, tableHeight])

    const generateRows = useCallback(() => {
        let index = scroll.index
        const end = scroll.end
        let items = []

        do {
            if (index >= rows.length) {
                index = rows.length
                break
            }

            items.push(
                <tr className={`tr ctr ${(index % 2) === 0 ? 'tr-odd' : 'tr-even'}`} style={{
                    position: "absolute",
                    top: (index * rowHeight),
                    left: 0,
                    height: rowHeight,
                    lineHeight: `${rowHeight}px`,
                    maxHeight: `${rowHeight}px`
                }} key={index}>
                    {/* eslint-disable-next-line no-loop-func */}
                    {columns.map((column, i) =>
                        <td key={i}>
                            {rows[index][column]}
                        </td>
                    )}
                </tr>
            )

            index++
        } while (index < end)

        return items
    },[columns, rowHeight, rows, scroll.end, scroll.index])

    const currentTableHeight = (tableHeight > stateTableHeight)
        ? stateTableHeight + 2
        : tableHeight


    return (
        <div className={"wrapper"}>
            <table>
                <thead>
                <tr className={'tr'}>
                    {columns?.map((name, i) =>
                        <th key={i}>{name}</th>
                    )}
                </tr>
                </thead>
            </table>
            <table className='table-content' style={{
                height: currentTableHeight
            }} onScroll={onScroll}>
                <tbody style={{
                    position: "relative",
                    display: 'inline-block',
                    height: stateTableHeight,
                    maxHeight: stateTableHeight,
                    width: "100%",
                    paddingRight: 2,
                    paddingLeft: 2,
                }}>
                {generateRows()}
                </tbody>
            </table>
        </div>
    )
}

export default Table