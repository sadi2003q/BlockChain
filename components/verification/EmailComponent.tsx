import * as React from "react";
import {JSX} from "react";

type EmailTemplateProps = {
    name: string;
    otp: string;
};

export function _EmailTemplate({
                                   name,
                                   otp,
                               }: EmailTemplateProps): JSX.Element {
    const displayOtp = `${otp.slice(0, 3)} ${otp.slice(3)}`;

    return (
        <div style={{ backgroundColor: "#f9fafb", padding: "20px", fontFamily: "sans-serif" }}>
            <table
                align="center"
                cellPadding="0"
                cellSpacing="0"
                width="100%"
                style={{
                    maxWidth: "600px",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid #e5e7eb",
                }}
            >
                <tbody>
                <tr>
                    <td style={{ padding: "40px 20px", textAlign: "center" }}>
                        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>
                            Verify your email
                        </h1>

                        <p style={{ fontSize: "16px", color: "#4b5563", marginBottom: "32px" }}>
                            Hi {name}, use the following verification code to complete your sign-in.
                            This code will expire in 5 minutes.
                        </p>

                        <div style={{ backgroundColor: "#f3f4f6", padding: "16px", borderRadius: "4px" }}>
                <span
                    style={{
                        fontSize: "32px",
                        fontWeight: "bold",
                        letterSpacing: "4px",
                        color: "#2563eb",
                        fontFamily: "monospace",
                    }}
                >
                  {displayOtp}
                </span>
                        </div>

                        <p style={{ fontSize: "14px", color: "#9ca3af", marginTop: "32px" }}>
                            If you didn’t request this, you can safely ignore this email.
                        </p>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
