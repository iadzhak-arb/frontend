import {LineSeries, createChart, ColorType} from 'lightweight-charts';
import {useEffect, useRef} from 'react';

export const ChartComponent = props => {
    const {
        dataOpen,
        dataClose,
        colors: {
            backgroundColor = 'white',
            lineColor = '#2962FF',
            textColor = 'black',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        } = {},
    } = props;

    const chartContainerRef = useRef<any>(null);

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({width: chartContainerRef.current.clientWidth});
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: {type: ColorType.Solid, color: backgroundColor},
                    textColor,
                },
                width: chartContainerRef.current.clientWidth,
                height: 500,
            });
            chart.timeScale().fitContent();

            const openSeries = chart.addSeries(LineSeries, {color: 'rgb(77, 166, 255)'});
            openSeries.setData(dataOpen);
            openSeries.createPriceLine({price: 0, color: 'black'})

            const closeSeries = chart.addSeries(LineSeries, {color: 'rgb(145, 8, 8)'});
            closeSeries.setData(dataClose);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                chart.remove();
            };
        },
        [dataOpen, dataClose, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    return (
        <div
            ref={chartContainerRef}
        />
    );
};


export function ChartOpenClose({open, close}) {

    return (
        <ChartComponent dataOpen={open} dataClose={close}></ChartComponent>
    )
}