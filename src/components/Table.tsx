import {useState, UIEvent, useCallback, useRef} from "react";

interface OwnProps {
    rowHeight?: number;
    tableHeight?: number;
    rows: {[key: string]: string}[]
}
const Table = ({rowHeight = 50, tableHeight = 700, rows}: OwnProps) => {
    const columns = Object.keys(rows[0])
    const stateTableHeight = (rowHeight * rows.length)
    const tableRef = useRef<HTMLTableElement>(null)
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
            top: scrollTop
        }

        setScroll(() => newScroll);
    },[rowHeight, tableHeight])

    const generateRows = useCallback(() => {
        let index = scroll.index
        const end = scroll.end
        let items = []

        while (index < end) {
            if (index >= rows.length) {
                index = rows.length
                break
            }

            items.push(
                <tr className={`tr ctr ${(index % 2) === 0 ? 'tr-odd' : 'tr-even'}`} data-testid="item" style={{
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
        }

        return items
    },[columns, rowHeight, rows, scroll.end, scroll.index])

    const currentTableHeight = (tableHeight > stateTableHeight)
        ? stateTableHeight + 2
        : tableHeight

    const scrollToTop = () => {
        if(tableRef.current){
            tableRef.current.scrollTo({top: 0, behavior: "smooth"})
        }
    }

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
            }} onScroll={onScroll} ref={tableRef} >
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
                <tbody className="top-wrapper">
                    <tr>
                        <td>
                            {scroll.top !== 0 && (
                                <button className="top-btn" onClick={scrollToTop}>Top</button>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table