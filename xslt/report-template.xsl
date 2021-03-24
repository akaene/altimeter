<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format"
                version="1.0">
    <xsl:output encoding="UTF-8" indent="yes" method="xml" standalone="no" omit-xml-declaration="no"/>

    <xsl:param name="lang" select="'en'"/>

    <xsl:variable name="tmx" select="document('xslt/tmx.xml')/tmx/body"/>
    <xsl:param name="numberFormat" select="$tmx/tu[@tuid='numberFormat']/tuv[lang($lang)]/seg"/>
    <xsl:param name="latitudeCaption" select="$tmx/tu[@tuid='latitude']/tuv[lang($lang)]/seg"/>
    <xsl:param name="longitudeCaption" select="$tmx/tu[@tuid='longitude']/tuv[lang($lang)]/seg"/>
    <xsl:param name="elevationCaption" select="$tmx/tu[@tuid='elevation']/tuv[lang($lang)]/seg"/>
    <xsl:param name="safetyAltitudeLevelCaption" select="$tmx/tu[@tuid='safetyAltitudeLevel']/tuv[lang($lang)]/seg"/>
    <xsl:param name="maxObstacleHeightCaption" select="$tmx/tu[@tuid='maxObstacleHeight']/tuv[lang($lang)]/seg"/>
    <xsl:param name="metersAboveSeaLevel" select="$tmx/tu[@tuid='metersAboveSeaLevel']/tuv[lang($lang)]/seg"/>
    <xsl:param name="safetyZoneCaption" select="$tmx/tu[@tuid='safetyZone']/tuv[lang($lang)]/seg"/>

    <xsl:decimal-format name="en" grouping-separator="," decimal-separator="."/>
    <xsl:decimal-format name="cs" grouping-separator=" " decimal-separator=","/>

    <xsl:template match="SafetyData">
        <fo:root>
            <fo:layout-master-set>
                <fo:simple-page-master master-name="A4-portrail" page-height="297mm" page-width="210mm"
                                       margin-top="25mm" margin-bottom="25mm" margin-left="25mm" margin-right="25mm">
                    <fo:region-body region-name="xsl-region-body" margin-top="20mm" margin-bottom="20mm"/>
                    <fo:region-before region-name="xsl-region-before" extent="25mm" display-align="before"
                                      precedence="true"/>
                    <fo:region-after region-name="xsl-region-after" extent="25mm" display-align="after"/>
                </fo:simple-page-master>
            </fo:layout-master-set>
            <fo:page-sequence master-reference="A4-portrail" font-family="Roboto Regular">
                <fo:static-content flow-name="xsl-region-before">
                    <fo:block font-size="150%">
                        Altimeter
                    </fo:block>
                </fo:static-content>
                <fo:static-content flow-name="xsl-region-after">
                    <fo:block>
                        &#169; 2019 AKAENE Partners, s.r.o.
                    </fo:block>
                </fo:static-content>

                <fo:flow flow-name="xsl-region-body" border-collapse="collapse" reference-orientation="0">
                    <fo:table table-layout="fixed" width="100%" font-size="10pt">
                        <fo:table-column column-width="proportional-column-width(50)"/>
                        <fo:table-column column-width="proportional-column-width(45)"/>
                        <fo:table-body>
                            <fo:table-row>
                                <fo:table-cell text-align="left" display-align="center">
                                    <fo:block>
                                        <xsl:value-of select="$latitudeCaption"/>
                                    </fo:block>
                                </fo:table-cell>
                                <fo:table-cell text-align="right" display-align="center">
                                    <fo:block>
                                        <xsl:value-of select="latitude"/>
                                    </fo:block>
                                </fo:table-cell>
                            </fo:table-row>
                            <fo:table-row>
                                <fo:table-cell text-align="left" display-align="center" padding-top="2.5mm">
                                    <fo:block>
                                        <xsl:value-of select="$longitudeCaption"/>
                                    </fo:block>
                                </fo:table-cell>
                                <fo:table-cell text-align="right" display-align="center" padding-top="2.5mm">
                                    <fo:block>
                                        <xsl:value-of select="longitude"/>
                                    </fo:block>
                                </fo:table-cell>
                            </fo:table-row>
                            <fo:table-row>
                                <fo:table-cell text-align="left" display-align="center" padding-top="2.5mm">
                                    <fo:block>
                                        <xsl:value-of select="$elevationCaption"/>
                                    </fo:block>
                                </fo:table-cell>
                                <fo:table-cell text-align="right" display-align="center" padding-top="2.5mm">
                                    <fo:block>
                                        <xsl:value-of select="format-number(elevation, $numberFormat, $lang)"/>
                                        <xsl:value-of select="' '"/>
                                        <xsl:value-of select="$metersAboveSeaLevel"/>
                                    </fo:block>
                                </fo:table-cell>
                            </fo:table-row>
                            <fo:table-row>
                                <fo:table-cell text-align="left" display-align="center" padding-top="2.5mm">
                                    <fo:block>
                                        <xsl:value-of select="$safetyAltitudeLevelCaption"/>
                                    </fo:block>
                                </fo:table-cell>
                                <fo:table-cell text-align="right" display-align="center" padding-top="2.5mm">
                                    <fo:block>
                                        <xsl:value-of
                                                select="format-number(safetyAltitudeLevel, $numberFormat, $lang)"/>
                                        <xsl:value-of select="' '"/>
                                        <xsl:value-of select="$metersAboveSeaLevel"/>
                                    </fo:block>
                                </fo:table-cell>
                            </fo:table-row>
                            <fo:table-row>
                                <fo:table-cell text-align="left" display-align="center" padding-top="2.5mm">
                                    <fo:block>
                                        <xsl:value-of select="$maxObstacleHeightCaption"/>
                                    </fo:block>
                                </fo:table-cell>
                                <fo:table-cell text-align="right" display-align="center" padding-top="2.5mm">
                                    <fo:block>
                                        <xsl:value-of select="format-number(maxObstacleHeight, $numberFormat, $lang)"/>
                                        <xsl:value-of select="' m'"/>
                                    </fo:block>
                                </fo:table-cell>
                            </fo:table-row>
                            <fo:table-row>
                                <fo:table-cell text-align="left" display-align="center" padding-top="2.5mm">
                                    <fo:block>
                                        <xsl:value-of select="$safetyZoneCaption"/>
                                    </fo:block>
                                </fo:table-cell>
                                <fo:table-cell text-align="right" display-align="center" padding-top="2.5mm">
                                    <fo:block>
                                        <xsl:value-of select="safetyZone"/>
                                    </fo:block>
                                </fo:table-cell>
                            </fo:table-row>
                        </fo:table-body>
                    </fo:table>
                </fo:flow>
            </fo:page-sequence>
        </fo:root>
    </xsl:template>
</xsl:stylesheet>
